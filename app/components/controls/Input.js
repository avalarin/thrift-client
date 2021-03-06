import React from 'react'

export default class Input extends React.Component {
    render() {
        const { type = 'text', name, value, onChange } = this.props

        return <input className="form-control input-block" type={type} value={value || ''} onChange={e => onChange(name, e.target.value)} />
    }
}