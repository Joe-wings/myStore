import { Card } from "antd";
import { product } from "../../type";
const { Meta } = Card;


const ProductList = ( { productlist } : { productlist: Array<product> }) => {
    //获取产品信息

    return (
        //产品卡片
        <>
            {productlist.map(product =>
                <Card
                    key={product.name}
                    hoverable
                    style={{ height: 400,width: 250,marginRight: 10,marginBottom: 10,display: "inline-block" }}
                    cover={<img alt="example" src={product.image} />}
                >
                    <Meta 
                        title={product.name} 
                        description={
                            <>
                                <div>价格：{product.price}</div>
                                <div>库存：{product.count}</div>
                                <div>描述：{product.description}</div>
                            </>
                            
                        } 
                    />
                </Card>
            )}</>


    )
}

export default ProductList;