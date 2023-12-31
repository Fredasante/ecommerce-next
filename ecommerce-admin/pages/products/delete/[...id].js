import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DeleteProductPage = () => {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  console.log({ productInfo });

  function goToProducts() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goToProducts();
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete "{productInfo?.title}"
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goToProducts}>
          No
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProductPage;
