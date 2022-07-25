import React from 'react'
import { PickerView, PickerViewColumn, View } from '@taror/components'
import '@taror/components/lib/picker-view/style'

const date = new Date()
const years: number[] = []
const months: number[] = []
const days: number[] = []

for (let i = 1990; i <= date.getFullYear(); i++) {
    years.push(i)
}

for (let i = 1; i <= 12; i++) {
    months.push(i)
}

for (let i = 1; i <= 31; i++) {
    days.push(i)
}

const App: React.FC = () => (
    <PickerView>
        <PickerViewColumn>
            {years.map(year => <View className='item'>{year}年</View>)}
        </PickerViewColumn>
        <PickerViewColumn>
            {months.map(month => <View className='item'>{month}月</View>)}
        </PickerViewColumn>
        <PickerViewColumn>
            {days.map(day => <View className='item'>{day}日</View>)}
        </PickerViewColumn>
    </PickerView>
)

export default App
