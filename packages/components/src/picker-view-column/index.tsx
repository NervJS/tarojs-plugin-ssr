import React from 'react'

export interface PickerViewColumnProps {
    children?: React.ReactNode
}

const PickerViewColumn: React.FC<PickerViewColumnProps> = ({children}) => <>{children}</>

export default PickerViewColumn
