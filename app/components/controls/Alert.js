import React from 'react'
import classnames from 'classnames'

export default class Alert extends React.Component {
    render() {
        const { type, header, message } = this.props
        
        var cn = classnames({
            flash: true,
            [`flash-${type}`]: !!type
        })

        return <div className={cn}>
            <b>{header}</b>
            <br/>
            {'' + message}
        </div>
    }
}