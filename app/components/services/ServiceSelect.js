import React from 'react'
import { connect } from 'react-redux'
import { showModal } from '~/actions/modals'
import { selectService, editSelectedService } from '~/actions/services'

import classnames from 'classnames'
import jss from 'react-jss'

const styles = {
    list: {
        width: '280px'
    },
    button: {
        marginLeft: '5px'
    }
}

const ServiceSelect = ({ services, selectedIndex, onAdd, onSelect, onEdit, sheet: { classes } }) => (
    <div>
        <select className={`form-select ${classes.list}`} value={selectedIndex} onChange={e => onSelect({index: e.target.selectedIndex})}>
            { services.map((service, i) => <option key={`service-${i}`} value={i}>{service.name}</option>) }
        </select>
        <button className={`btn ${classes.button}`} onClick={onAdd}>Add</button>
        <button className={`btn ${classes.button}`} onClick={onEdit}>Edit</button>
    </div>
)

export default connect((state, ownProps) => ({
    services: state.services.get('list').toJS(),
    selectedIndex: state.services.get('selected')
}), (dispatch, ownProps) => ({
    onAdd: () => dispatch(showModal("loadServices")),
    onSelect: (index) => dispatch(selectService(index)),
    onEdit: () => dispatch(editSelectedService())
}))(jss(styles)(ServiceSelect))
