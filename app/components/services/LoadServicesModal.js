import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '~/components/controls/Modal'
import LoadingIndicator from '~/components/controls/LoadingIndicator'
import { saveSelectedTempServices, loadTempServices, selectTempService } from '~/actions/services'

import classnames from 'classnames'
import jss from 'react-jss'

const styles = {
    list: {
      'margin-top': '15px',
      height: '280px',
      'overflow-y': 'scroll'
    },
    alert: {
        'margin-top': '15px',
        'margin-bottom': '15px'
    }
}

const LoadServicesModal = ({ services, selected, error, loading, onLoad, onSelect, onSave, sheet: {classes} }) => {
    let url = ''

    let content;
    if (loading) {
        content = <LoadingIndicator/>
    } else if (error) {
        content = <div className={`flash flash-error ${classes.alert}`}>
            <b>Error occurred while loading:</b>
            <br/>
            {'' + error}
        </div>
    } else {
        content = <nav className={`menu ${classes.list}`}>
            { services.map((service, i) => 
                <a key={i} className={classnames({'menu-item': true, 'selected': selected == i})} href="#" 
                   onClick={() => onSelect(i)}>
                    {service.name}
                </a>) 
            }
        </nav>
    }

    return <Modal name="loadServices" header="Load thrift">
        <input className="form-control" placeholder="URL" type="text" onChange={e => url = e.target.value} />
        <button className="btn">...</button>
        <button className="btn" onClick={() => onLoad(url)}>Load</button>

        { content }

        <button className="btn btn-primary" onClick={onSave}>Select</button>
    </Modal>
}

export default connect((state, ownProps) => ({
    services: state.services.getIn(['temp', 'list']).toJS(),
    selected: state.services.getIn(['temp', 'selected']),
    error: state.services.getIn(['temp', 'error']),
    loading: state.services.getIn(['temp', 'loading'])
}), (dispatch, ownProps) => ({
    onLoad: (url) => dispatch(loadTempServices(url)),
    onSelect: (index) => dispatch(selectTempService(index)),
    onSave: () => dispatch(saveSelectedTempServices())
}))(jss(styles)(LoadServicesModal))
