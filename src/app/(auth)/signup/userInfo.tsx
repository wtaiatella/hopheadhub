import React from 'react'
import { Form, Input } from 'antd'

export default function userInfo() {
   return (
      <>
         <Form.Item
            name="name1"
            label="Nome"
            preserve={true}
            rules={[{ required: true, message: 'Por favor insira seu nome!' }]}
         >
            <Input placeholder="Digite seu nome completo" />
         </Form.Item>
         <Form.Item
            name="phone"
            label="Telefone"
            preserve={true}
            rules={[
               { required: true, message: 'Por favor insira seu telefone!' },
               { pattern: /^[0-9]+$/, message: 'O telefone deve conter apenas números!' },
            ]}
         >
            <Input placeholder="Digite seu telefone" />
         </Form.Item>
      </>
   )
}
