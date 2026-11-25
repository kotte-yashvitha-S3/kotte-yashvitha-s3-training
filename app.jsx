import React, { useState } from "react";

function ProductInvoice() {
  const [pid, setPid] = useState("");
  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [invoice, setInvoice] = useState(null);

  const handlePrintInvoice = () => {
    const p = parseFloat(price) || 0;
    const q = parseInt(quantity) || 0;
    const total = p * q;

    // Example discount slab (8% for >= 50,000 gives 6000.00 on 75000)
    let discountRate = 0;
    if (total >= 50000) {
      discountRate = 0.08;
    } else if (total >= 20000) {
      discountRate = 0.05;
    }

    const discount = total * discountRate;
    const afterDiscount = total - discount;
    const gst = afterDiscount * 0.18; // 18% GST
    const finalBill = afterDiscount + gst;

    setInvoice({
      pid,
      pname,
      price: p.toFixed(2),
      quantity: q,
      total: total.toFixed(2),
      discount: discount.toFixed(2),
      gst: gst.toFixed(2),
      finalBill: finalBill.toFixed(2),
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px", fontFamily: "Arial" }}>
      <h1>Product Invoice</h1>

      <div style={{ marginBottom: "8px" }}>
        <label>Product Id: </label>
        <input
          type="text"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label>Product Name: </label>
        <input
          type="text"
          value={pname}
          onChange={(e) => setPname(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <label>Price: </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <button onClick={handlePrintInvoice}>Print Invoice</button>

      {invoice && (
        <div style={{ marginTop: "20px", lineHeight: "1.8" }}>
          <div>Prod P id : {invoice.pid}</div>
          <div>PName : {invoice.pname}</div>
          <div>Price : {invoice.price}</div>
          <div>Quantity : {invoice.quantity}</div>
          <div>Total : {invoice.total}</div>
          <div>Discount : {invoice.discount}</div>
          <div>GST : {invoice.gst}</div>
          <div>
            <strong>Final Bill : {invoice.finalBill}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInvoice;
