import React from 'react'
import { connect } from 'react-redux'
import { showModal } from '~/actions/modals'

const ServiceSelect = ({ services, onAdd }) => (
    <div>
        <select className="form-select">
            { services.map((service, i) => <option>{service.name}</option>) }
        </select>
        <button className="btn" onClick={onAdd}>add</button>
    </div>
)

export default connect((state, ownProps) => ({
    services: state.services.get('list').toJS()
}), (dispatch, ownProps) => ({
    onAdd: () => dispatch(showModal("loadServices"))
}))(ServiceSelect)
