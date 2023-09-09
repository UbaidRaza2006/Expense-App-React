
import { Button, Space, Table, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import './global.css'
import FormItem from 'antd/es/form/FormItem';
const { Column } = Table;

export default function ExpenseTracker() {
    // naya
    const [form] = Form.useForm();
    // nayyaaa
    const [new1,setNew1]=useState('')
    // const [values,setformdata]=useState({
    //     amount:'',
    //     desc:'',
    // })
    const [transactions, setTransactions] = useState([
        // naya 
        // {
        //     created_at: new Date().toLocaleString(),
        //     amount: 400,
        //     type: 'income',
        //     desc: "testing"
        // }
        // nayaaa

    ])
    const [type, setType] = useState(undefined)
    const [totals, setTotals] = useState({
        income: 0,
        expense: 0,
        profitLoss: 0
    })
    // naya
    const [isEdit, setIsEdit] = useState(null)
    // nayaaa

    useEffect(() => {
        if (transactions.length) {
            let income = 0
            let expense = 0
            transactions.forEach((data) => {
                if (data.type === 'income') {
                    income = income + parseInt(data.amount)
                } else {
                    expense = expense + parseInt(data.amount)
                }
            })

            setTotals({ income: income, expense: expense, profitLoss: income - expense})
            if (totals.profitLoss<0){
            // console.log(totals.profitLoss.toString().split("").shift());
            setNew1(totals.profitLoss.toString().split("").slice(1,totals.profitLoss.length))
            console.log(totals.profitLoss.toString().split("").slice(1,totals.profitLoss.length));
            console.log('Saalam');
            setTotals({ income: income, expense: expense, profitLoss: new1})
            }
            // setTotals({ income: income, expense: expense, profitLoss: new1})

        }
    }, [transactions])


    const onFinish = (values) => {
        console.log(values);
        if (isEdit !== null) {
            transactions[isEdit] = {
                ...values,
                type,
                created_at: new Date().toLocaleString()
            };
            setTransactions([...transactions]);
            setIsEdit(null);
        } else {
            const obj = {
                ...values,
                type,
                created_at: new Date().toLocaleString()
            };
            setTransactions([obj, ...transactions]);
            
        }
        form.resetFields()
    
        // Reset the form fields to empty values
        form.resetFields(); // Use form.resetFields() without any arguments to reset all fields.
    }
    
    // naya
    const edit = (record, ind) => {
        setIsEdit(ind)
        form.setFieldsValue({
            amount: record.amount,
            desc: record.desc
        })
        setType(record.type)
    }
    const deleteTransaction = (ind) => {
        transactions.splice(ind, 1)
        setTransactions([...transactions])
    }
    // nayaaaa

    // const columns = [
    //     {
    //         title: 'Date',
    //         dataIndex: 'created_at',
    //         key: 'created_at',
    //     },
    //     {
    //         title: 'Amount',
    //         dataIndex: 'amount',
    //         key: 'amount',
    //     },
    //     {
    //         title: 'Description',
    //         dataIndex: 'desc',
    //         key: 'desc',
    //     },
    //     {
    //         title: 'Type',
    //         dataIndex: 'type',
    //         key: 'type',
    //     },
    // ];
    return (
        <div id='diviii' 
        // className="min-h-screen p-5 bg-white flex flex-col items-center"
        >
            <h2 className='expense'
            // className="font-700 text-[30px]"
            >Expense Tracker</h2>
            <div className='income1'>

                <div  
                // className='flex'
                >
                    <div id='income'
                        onClick={() => setType('income')}
                        style={{
                            borderColor: '#ccc', borderRadius: 25,
                            cursor: 'pointer', borderWidth: 1,
                            backgroundColor: type === 'income' ? 'green' : 'white',
                            color: type === 'income' ? '#fff' : '#000'
                        }}
                        //  className={`px-4 py-2 m-2`}
                         >
                        Income
                    </div>

                    <div id='expensee' style={{
                        borderColor: '#ccc', borderRadius: 25,
                        cursor: 'pointer', borderWidth: 1,
                        backgroundColor: type === 'expense' ? 'red' : 'white',
                        color: type === 'expense' ? '#fff' : '#000'
                    }}
                        onClick={() => setType('expense')}
                        // className={`px-4 py-2 m-2 `}
                        >
                        Expense
                    </div>
                </div>

                <Form
                    name="control-hooks"
                    form={form}
                    style={{
                        maxWidth: 600,
                    }}
                    
                    onFinish={onFinish}
                >
                    <Form.Item
                        label={'Amount'}
                        name={'amount'}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your amount!',
                            },
                        ]}

                    >
                        <Input type='number' />
                    </Form.Item>

                    <Form.Item
                        label={'Description'}
                        name={'desc'}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}

                    >
                        <Input type='text' />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button  htmlType="submit">
                       {/* naya */}
                        {isEdit !== null ? 'Edit' : 'Submit'}
                        {/* nayaaaa */}
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div 
            // className='w-[700px] border-black flex abc'
            >

                <div 
                // className='p-3' 
                style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
                    <h1 >Income</h1>
                    <h1 
                    // className='font-bold text-[40px] text-green-400'
                    >{totals.income}</h1>
                </div>
                <div
                 className='p-3'
                  style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
                    <h1>Expense</h1>
                    <h1
                    //  className='font-bold text-[40px] text-red-400'
                     >{totals.expense}</h1>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', }}>
                    <h1>Profit Loss</h1>
                    <h1 
                    // className='font-bold text-[40px] text-red-400'
                     style={{  color: totals.profitLoss >= 0 ? 'green' : 'red' }}
                     >{totals.profitLoss}</h1>
                </div>

            </div>

            <Table style={{ width: "700px" }} dataSource={transactions}
            // columns={columns}/
            >
                <Column dataIndex={'created_at'} key={'created_at'} title='Date' />
                <Column dataIndex={'amount'} key={'amount'} title='Amount' />
                <Column dataIndex={'desc'} key={'desc'} title='Description' />
                <Column dataIndex={'type'} key={'type'} title='Type' />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record, ind) => {
                        return (
                            <Space size="middle">
                                <a onClick={() => edit(record, ind)}><EditOutlined /></a>
                                <a onClick={() => deleteTransaction(ind)}><DeleteOutlined /></a>
                            </Space>
                        )
                    }} />
            </Table>


        </div>
    )
}