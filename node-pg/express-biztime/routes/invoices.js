/** Invoice management routes for BizTime application. */


const express = require("express");
const ExpressError = require("../expressError")
const db = require("../db");

const router = express.Router();


/** GET / => list of invoices.
 *
 * =>  {invoices: [{id, comp_code}, ...]}
 *
 * */

router.get("/", async function (req, res, next) {
  try {
    const invoicesResult = await db.query(
          `SELECT id, comp_code
           FROM invoices 
           ORDER BY id ASC`
    );

    return res.json({"invoices": invoicesResult.rows});
  }

  catch (err) {
    return next(err);
  }
});


/** GET /[id] => detail on invoice
 *
 * =>  {invoices: {id,
 *                amt,
 *                paid,
 *                add_date,
 *                paid_date,
 *                company: {code, name, description}}}
 *
 * */

router.get("/:id", async function (req, res, next) {
  try {
    const invoiceId = req.params.id;

    const invoiceQuery = await db.query(
          `SELECT i.id, 
                  i.comp_code, 
                  i.amt, 
                  i.paid, 
                  i.add_date, 
                  i.paid_date, 
                  c.name, 
                  c.description 
           FROM invoices AS i
             INNER JOIN companies AS c ON (i.comp_code = c.code)  
           WHERE i.id = $1`,
        [invoiceId]);

    if (invoiceQuery.rows.length === 0) {
      throw new ExpressError(`Invoice not found: ${invoiceId}`, 404);
    }

    const invoiceData = invoiceQuery.rows[0];
    const invoiceDetails = {
      id: invoiceData.id,
      company: {
        code: invoiceData.comp_code,
        name: invoiceData.name,
        description: invoiceData.description,
      },
      amt: invoiceData.amt,
      paid: invoiceData.paid,
      add_date: invoiceData.add_date,
      paid_date: invoiceData.paid_date,
    };

    return res.json({"invoice": invoiceDetails});
  }

  catch (err) {
    return next(err);
  }
});


/** POST / => add new invoice
 *
 * {comp_code, amt}  =>  {id, comp_code, amt, paid, add_date, paid_date}
 *
 * */

router.post("/", async function (req, res, next) {
  try {
    let {comp_code, amt} = req.body;

    const result = await db.query(
          `INSERT INTO invoices (comp_code, amt) 
           VALUES ($1, $2) 
           RETURNING id, comp_code, amt, paid, add_date, paid_date`,
        [comp_code, amt]);

    return res.json({"invoice": result.rows[0]});
  }

  catch (err) {
    return next(err);
  }
});


/** PUT /[code] => update invoice
 *
 * {amt, paid}  =>  {id, comp_code, amt, paid, add_date, paid_date}
 *
 * If paying unpaid invoice, set paid_date; if marking as unpaid, clear paid_date.
 * */

router.put("/:id", async function (req, res, next) {
  try {
    let {amt, paid} = req.body;
    let id = req.params.id;
    let paidDate = null;

    const currResult = await db.query(
          `SELECT paid
           FROM invoices
           WHERE id = $1`,
        [id]);

    if (currResult.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    const currPaidDate = currResult.rows[0].paid_date;

    if (!currPaidDate && paid) {
      paidDate = new Date();
    } else if (!paid) {
      paidDate = null
    } else {
      paidDate = currPaidDate;
    }

    const result = await db.query(
          `UPDATE invoices
           SET amt=$1, paid=$2, paid_date=$3
           WHERE id=$4
           RETURNING id, comp_code, amt, paid, add_date, paid_date`,
        [amt, paid, paidDate, id]);

    return res.json({"invoice": result.rows[0]});
  }

  catch (err) {
    return next(err);
  }

});


/** DELETE /[code] => delete invoice
 *
 * => {status: "deleted"}
 *
 */

router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;

    const result = await db.query(
          `DELETE FROM invoices
           WHERE id = $1
           RETURNING id`,
        [id]);

    if (result.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    return res.json({"status": "deleted"});
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;
