import React from 'react'
import { Form, Input } from 'antd'

export default function loginInfo() {
   return (
      <>
         <div>loginInfo</div>
         <Form.Item
            name="name"
            label="Nome"
            preserve={true}
            rules={[{ required: true, message: 'Por favor insira seu nome!' }]}
         >
            <Input placeholder="Digite seu nome" />
         </Form.Item>
         <Form.Item
            name="email"
            label="Email"
            preserve={true}
            rules={[
               { required: true, message: 'Por favor insira seu email!' },
               { type: 'email', message: 'Por favor insira um email válido!' },
            ]}
         >
            <Input placeholder="Digite seu email" />
         </Form.Item>
      </>
   )
}
