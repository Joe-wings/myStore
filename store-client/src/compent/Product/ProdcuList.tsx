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
                    hoverable
                    style={{ width: 240,display: 'inline-block',marginRight: 10,marginBottom: 10 }}
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