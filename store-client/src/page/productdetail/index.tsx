import { useEffect, useState } from "react";
import { Button, Card, Flex, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { getProductByIdApi } from "../../api/product";
import { product } from "../../type";

const Detail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<product>({
    creatorId: 0,
    groupId: 0,
    description: "",
    id: 0,
    name: "",
    price: 0,
    count: 0,
    image: "",
  });
  if (!id) {
    window.location.href = "/layout";
  } else {
    useEffect(() => {
      const fetchDate = async () => {
        const res = await getProductByIdApi(+id);
        setProduct(res.data);
      };
      fetchDate();
    }, [id]);
  }

  return (
    <Card
      hoverable
      style={{ width: 1000, margin: "0 auto" }}
      styles={{ body: { padding: 0, overflow: "hidden" } }}
    >
      <Flex justify="space-between" style={{ width: 1000 }}>
        <img alt="avatar" width={350} height={350} src={product?.image} />
        <Flex
          vertical
          flex="left"
          align="flex-end"
          justify="space-between"
          style={{ marginLeft: 20, marginTop: -20, padding: 20 }}
        >
          <Typography.Title
            level={3}
            style={{ display: "flex", float: "left", marginTop: 10 }}
          >
            {product?.name}
          </Typography.Title>
          <span>
            ￥<b style={{ fontSize: 40, color: "red" }}>{product?.price}</b>
          </span>
          包邮&nbsp;&nbsp;
          {product?.count > 0 ? <>现在有货</> : <>暂时缺货</>}
          <Button
            type="primary"
            href="#"
            onClick={() => {
              console.log(product);
            }}
          >
            购买
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Detail;
