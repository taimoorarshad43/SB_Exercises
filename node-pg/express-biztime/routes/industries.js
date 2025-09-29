/** Industry management routes for BizTime application. */


const express = require("express");
const ExpressError = require("../expressError")
const db = require("../db");

const router = express.Router();


/** GET / => list of industries.
 *
 * =>  {industries: [{code, industry, companies: [code, ...]}, ...]}
 *
 * */

router.get("/", async function (req, res, next) {
  try {
    const industriesResult = await db.query(
          `SELECT i.code, i.industry, 
                  COALESCE(
                    ARRAY_AGG(ci.comp_code ORDER BY ci.comp_code) FILTER (WHERE ci.comp_code IS NOT NULL),
                    ARRAY[]::TEXT[]
                  ) as companies
           FROM industries i
           LEFT JOIN company_industries ci ON i.code = ci.industry_code
           GROUP BY i.code, i.industry
           ORDER BY i.industry ASC`
    );

    return res.json({"industries": industriesResult.rows});
  }

  catch (err) {
    return next(err);
  }
});


/** POST / => add new industry
 *
 * {industry}  =>  {industry: {code, industry}}
 *
 * */

router.post("/", async function (req, res, next) {
  try {
    const {industry} = req.body;
    const industryCode = industry.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 10);

    const newIndustry = await db.query(
          `INSERT INTO industries (code, industry) 
           VALUES ($1, $2) 
           RETURNING code, industry`,
        [industryCode, industry]);

    return res.status(201).json({"industry": newIndustry.rows[0]});
  }

  catch (err) {
    return next(err);
  }
});


/** POST /:code/companies => associate industry with company
 *
 * {comp_code}  =>  {industry: {code, industry, companies: [code, ...]}}
 *
 * */

router.post("/:code/companies", async function (req, res, next) {
  try {
    const industryCode = req.params.code;
    const {comp_code} = req.body;

    // Check if industry exists
    const industryCheck = await db.query(
          `SELECT code FROM industries WHERE code = $1`,
        [industryCode]
    );

    if (industryCheck.rows.length === 0) {
      throw new ExpressError(`Industry not found: ${industryCode}`, 404);
    }

    // Check if company exists
    const companyCheck = await db.query(
          `SELECT code FROM companies WHERE code = $1`,
        [comp_code]
    );

    if (companyCheck.rows.length === 0) {
      throw new ExpressError(`Company not found: ${comp_code}`, 404);
    }

    // Create association
    await db.query(
          `INSERT INTO company_industries (comp_code, industry_code) 
           VALUES ($1, $2) 
           ON CONFLICT (comp_code, industry_code) DO NOTHING`,
        [comp_code, industryCode]
    );

    // Return updated industry with companies
    const result = await db.query(
          `SELECT i.code, i.industry, 
                  COALESCE(
                    ARRAY_AGG(ci.comp_code ORDER BY ci.comp_code) FILTER (WHERE ci.comp_code IS NOT NULL),
                    ARRAY[]::TEXT[]
                  ) as companies
           FROM industries i
           LEFT JOIN company_industries ci ON i.code = ci.industry_code
           WHERE i.code = $1
           GROUP BY i.code, i.industry`,
        [industryCode]
    );

    return res.json({"industry": result.rows[0]});
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;
