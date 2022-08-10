import React from 'react'
import Layout from 'dumi-theme-mobile/es/layouts'
import './index.scss'

export default ({ children, ...props }) => (
  <Layout {...props}>
    {children}
  </Layout>
)
