import React from "react";

const ProductTable = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Description</th>
          <th>Qty</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.nama}</td>
            <td>{product.description}</td>
            <td>{product.qty}</td>
            <td>{product.category.nama}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
