import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

export default function TableUsers () {
    
    const columnUser = [
        {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            render: (name) => `${name.title} ${name.first} ${name.last}`,
            sorter: (a, b) => a.name.first.localeCompare(b.name.first)
          },
          {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                {
                  text: "Male",
                  value: "male",
                },
                {
                  text: "Female",
                  value: "female",
                },
              ],
              onFilter: (value, record) => {
                return record.gender === value;
              },
          }, 
          {
            title: 'Phone',
            dataIndex: 'phone',
          },
    ];
    
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const callAPI = async () => {
        setIsLoading(true);
        const respone = await axios({
            method: 'get',
            url: 'https://randomuser.me/api?results=100',
            data: {
                results: 100
            },
            type: 'json'
        });

        if (respone.status === 200) {
            setUserList(respone.data.results);
        }
        
        setIsLoading(false)
    };

    useEffect(() => {
        callAPI();
    }, []);


    return (
        <>
            <h2> Danh sách các thành viên trong lớp</h2>
            <Table
                dataSource={userList}
                columns={columnUser}
                rowKey={'email'}
                loading={isLoading}
            />
        </>
    )
}