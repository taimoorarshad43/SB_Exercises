/** Company management routes for BizTime application. */


const express = require("express");
const slugify = require("slugify");
const ExpressError = require("../expressError")
const db = require("../db");

const router = express.Router();


/** GET / => list of companies.
 *
 * =>  {companies: [{code, name, descrip}, {code, name, descrip}, ...]}
 *
 * */

router.get("/", async function (req, res, next) {
  try {
    const companiesResult = await db.query(
          `SELECT code, name 
           FROM companies 
           ORDER BY name ASC`
    );

    return res.json({"companies": companiesResult.rows});
  }

  catch (err) {
    return next(err);
  }
});


/** GET /[code] => detail on company
 *
 * =>  {company: {code, name, descrip, invoices: [id, ...]}}
 *
 * */

router.get("/:code", async function (req, res, next) {
  try {
    const companyCode = req.params.code;

    const companyQuery = await db.query(
          `SELECT code, name, description
           FROM companies
           WHERE code = $1`,
        [companyCode]
    );

    const invoicesQuery = await db.query(
          `SELECT id
           FROM invoices
           WHERE comp_code = $1`,
        [companyCode]
    );

    const industriesQuery = await db.query(
          `SELECT i.industry
           FROM industries i
           JOIN company_industries ci ON i.code = ci.industry_code
           WHERE ci.comp_code = $1`,
        [companyCode]
    );

    if (companyQuery.rows.length === 0) {
      throw new ExpressError(`Company not found: ${companyCode}`, 404)
    }

    const companyData = companyQuery.rows[0];
    const invoiceList = invoicesQuery.rows;
    const industryList = industriesQuery.rows;

    companyData.invoices = invoiceList.map(invoice => invoice.id);
    companyData.industries = industryList.map(industry => industry.industry);

    return res.json({"company": companyData});
  }

  catch (err) {
    return next(err);
  }
});


/** POST / => add new company
 *
 * {name, descrip}  =>  {company: {code, name, descrip}}
 *
 * */

router.post("/", async function (req, res, next) {
  try {
    const {name, description} = req.body;
    const companyCode = slugify(name, {lower: true});

    const newCompany = await db.query(
          `INSERT INTO companies (code, name, description) 
           VALUES ($1, $2, $3) 
           RETURNING code, name, description`,
        [companyCode, name, description]);

    return res.status(201).json({"company": newCompany.rows[0]});
  }

  catch (err) {
    return next(err);
  }
});


/** PUT /[code] => update company
 *
 * {name, descrip}  =>  {company: {code, name, descrip}}
 *
 * */

router.put("/:code", async function (req, res, next) {
  try {
    const {name, description} = req.body;
    const companyCode = req.params.code;

    const updatedCompany = await db.query(
          `UPDATE companies
           SET name=$1, description=$2
           WHERE code = $3
           RETURNING code, name, description`,
        [name, description, companyCode]);

    if (updatedCompany.rows.length === 0) {
      throw new ExpressError(`Company not found: ${companyCode}`, 404)
    } else {
      return res.json({"company": updatedCompany.rows[0]});
    }
  }

  catch (err) {
    return next(err);
  }

});


/** DELETE /[code] => delete company
 *
 * => {status: "added"}
 *
 */

router.delete("/:code", async function (req, res, next) {
  try {
    const companyCode = req.params.code;

    const deletedCompany = await db.query(
          `DELETE FROM companies
           WHERE code=$1
           RETURNING code`,
        [companyCode]);

    if (deletedCompany.rows.length === 0) {
      throw new ExpressError(`Company not found: ${companyCode}`, 404)
    } else {
      return res.json({"status": "deleted"});
    }
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;
