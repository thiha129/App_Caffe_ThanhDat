import React, { useEffect, useState } from 'react'
import firebase from 'firebase';
type Props = {
    img: string;
    title: string;
    price: number;
    priceSale: number;
}
const dataProduct = () => {
    const [data, setData] = useState<Props[]>();
    useEffect(() => {
        const onValueChange =
            firebase.database()
                .ref('dataProduct')
                .on('value', (snapshot: { val: () => any }) => {
                    const todos = snapshot.val()
                    const todoList = []
                    for (let id in todos) {
                        todoList.push(todos[id]);
                    }
                    setData(todoList)
                    console.log(todoList);
                });
        return () => firebase.database().ref('dataProduct').off('value', onValueChange);
    }, []);
    console.log("Bạn đã vào đây!");

    return data;
}
export default dataProduct;
