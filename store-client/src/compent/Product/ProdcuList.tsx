import { Card } from "antd";
import { product, user } from "../../type";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getallusersApi} from "../../api/user";
const { Meta } = Card;


const ProductList = ( { productlist } : { productlist: Array<product> }) => {
    //获取产品信息
    const navigate=useNavigate()
    const [users, setUsers] = useState<user[]>();
    useEffect(() => {
        const featchData = async () => {
            const res=await getallusersApi()
            setUsers(res.data)
        }
        featchData()
    }, [])
    return (
        //产品卡片
        <>
            {productlist.map(product =>
                <Card
                    onClick={() => {navigate(`/layout/detail?id=${product.id}`)}}
                    key={product.name}
                    hoverable
                    style={{ height: 370,width: 250,marginRight: 10,marginBottom: 10,display: "inline-block",overflow: "hidden" }}
                    cover={<img alt="example" src={product.image} />}
                >
                    <Meta 
                        
                        style={{marginTop: -10}}
                        description={
                            <>
                            <div style={{fontSize: 18,color: "black",WebkitLineClamp: 2,overflow: "hidden",textOverflow: "ellipsis",display: "-webkit-box",WebkitBoxOrient: "vertical"}}><b>{product.name}</b></div>
                                ￥<span style={{fontSize: 24,color: "red"}}><b>{product.price}</b></span>
                                <div>创建人：{users?.find(user=>user.id===product.creatorId)?.username}</div>
                            </>
                            
                        } 
                    />
                </Card>
            )}</>


    )
}

export default ProductList;