import React from 'react'
import { View, ScrollView, RichText } from '@taror/components'
import './demo1.scss'

const htmlSnip = `<div class="div_class">
  <h1>Title</h1>
  <p class="p">
    Life is&nbsp;<i>like</i>&nbsp;a box of
    <b>&nbsp;chocolates</b>
  </p>
  <img height="100px" width="100px" src="https://b.bdstatic.com/miniapp/images/demo-dog.png" />
</div>`

const nodeSnip = `
Page({
  data: {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: #4F99FB;;'
      },
      children: [{
        type: 'text',
        text: 'Life is like a box of chocolates'
      }]
    }]
  }
})`

const nodes = [{
    name: 'div',
    attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: #4F99FB;'
    },
    children: [{
        type: 'text',
        text: 'Life is like a box of chocolates'
    }]
}]

const App: React.FC = () => (
    <View className='wrap'>
        <View className="card-area">
            <View className="top-description border-bottom">通过HTML String渲染</View>
            <View className="description">代码示例</View>
            <ScrollView scrollY>
                <View className="cont">{htmlSnip}</View>
            </ScrollView>
            <View className="description">渲染效果</View>
            <View className="rich-text">
                <RichText nodes={htmlSnip} />
            </View>
        </View>
        <View className="card-area">
            <View className="top-description border-bottom">通过节点渲染</View>
            <View className="description">代码示例</View>
            <ScrollView scrollY>
                <View className="cont">{nodeSnip}</View>
            </ScrollView>
            <View className="description">渲染效果</View>
            <View className="rich-text">
                <RichText nodes={nodes} />
            </View>
        </View>
    </View>
)

export default App
