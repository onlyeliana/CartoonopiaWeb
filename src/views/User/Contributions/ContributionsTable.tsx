import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { contributionsprops } from '../../../types/alltype';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}
const contributionsdata = [
    {
        "contribution_id": "1",
        "user_id": { "_id": { "$oid": "5f5237a4c1beb1523fa3da02" } },
        "action": "AddCharacter",
        "status": "Approved",
        "reviewed_by": { "_id": { "$oid": "5f5237a4c1beb1523fa3da02" } },
        "date": "2020-09-05T00:00:00Z",
        "data": {
            "id": "test",
            "name": "Test Character",
            "subtitle": "Test Subtitle",
            "description": "Test Description",
            "image_url": "https://via.placeholder.com/150",
            "strength": 50,
            "speed": 50,
            "skill": 50,
            "fear_factor": 50,
            "power": 50,
            "intelligence": 50,
            "wealth": 50
        }
    },
    {
        "contribution_id": "2",
        "user_id": { "_id": { "$oid": "5f5237a4c1beb1523fa3da18" } },
        "action": "EditCharacter",
        "status": "Pending",
        "reviewed_by": null,
        "date": "2021-09-05T00:00:00Z",
        "data": {
            "id": "batman",
            "subtitle": "The Caped Crusader"
        }
    },
    {
        "contribution_id": "3",
        "user_id": { "_id": { "$oid": "5f5237a4c1beb1523fa3da02" } },
        "action": "DeleteCharacter",
        "status": "Rejected",
        "reviewed_by": { "_id": { "$oid": "5f5237a4c1beb1523fa3da02" } },
        "date": "2020-09-05T00:00:00Z",
        "data": {
            "id": "superman"
        }
    }
]

const columns: TableProps<contributionsprops>['columns'] = [
    {
        title: 'Contribution ID',
        dataIndex: 'contribution_id',
        key: 'contribution_id',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },
    {
        title: 'Status',
        key: 'status',
        render: (_, record) => {
            let color = "geekblue";
            switch (record.status) {
                case 'Approved':
                    color = 'green'
                    break;
                case 'Rejected':
                    color = 'volcano'
                    break;
            }
            return <Tag color={color} key={record.status}>
                {record.status}
            </Tag>
        }
    },
    {
        title: 'Reviewed By',
        key: 'reviewed_by',
        render: (_, record) => (
            record.reviewed_by ? record.reviewed_by._id.$oid : ''
        ),
    },
    {
        title: 'Date',
        key: 'date',
        render: (_, record) => {
            const date = new Date(record.date).toLocaleString()
            return date
        }
    },
    {
        title: 'Data ID',
        key: 'data_id',
        render: (_, record) => (
            record.data.id
        ),
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        // render: (_, { tags }) => (
        //     <>
        //         {tags.map((tag) => {
        //             let color = tag.length > 5 ? 'geekblue' : 'green';
        //             if (tag === 'loser') {
        //                 color = 'volcano';
        //             }
        //             return (
        //                 <Tag color={color} key={tag}>
        //                     {tag.toUpperCase()}
        //                 </Tag>
        //             );
        //         })}
        //     </>
        // ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                {/* <a>Invite {record.name}</a>
                <a>Delete</a> */}
            </Space>
        ),
    },
];


export function ContributionsTable() {

    return <Table columns={columns} dataSource={contributionsdata} />
}