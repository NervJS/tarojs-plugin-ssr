import React, { useState } from 'react'
import { PickerView, PickerViewColumn, View } from '@taror/components'
import '@taror/components/src/picker-view/style'
import './demo1.scss'

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

const App: React.FC = () => {
    const [value, setValue] = useState([years.length - 1, 1, 1])

    return (
        <>
            <View className='selected-date'>
                {years[value[0]]}年{months[value[1]]}月{days[value[2]]}日
            </View>
            <PickerView
                value={value}
                title='选择器标题'
                style={{
                    width: '100%',
                    height: '300px'
                }}
                onChange={event => {
                    if (event.detail.value) {
                        setValue(event.detail.value)
                    }
                }}
            >
                <PickerViewColumn>
                    {years.map(year => <View key={year} className='item'>{year}年</View>)}
                </PickerViewColumn>
                <PickerViewColumn>
                    {months.map(month => <View key={month} className='item'>{month}月</View>)}
                </PickerViewColumn>
                <PickerViewColumn>
                    {days.map(day => <View key={day} className='item'>{day}日</View>)}
                </PickerViewColumn>
            </PickerView>
        </>
    )
}

export default App
