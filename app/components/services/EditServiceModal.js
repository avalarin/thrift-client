import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Input from '~/components/controls/Input'
import Modal from '~/components/controls/Modal'
import { showModal, hideModal, EDIT_SERVICE_MODAL, LOAD_SERVICES_MODAL } from '~/actions/modals'
import { saveEditedService, setEditingServiceField } from '~/actions/services'

const EditServiceModal = ({ serviceSource, serviceName, serviceServer, isNew,
                             onBack, onNext, onValueChanged }) => {

    return <Modal name={EDIT_SERVICE_MODAL} header="Service details">
        <dl className="form-group">
            <dt><label>Source</label></dt>
            <dd>{serviceSource}</dd>
        </dl>
        <dl className="form-group">
            <dt><label>Name</label></dt>
            <dd><Input name="name" value={serviceName} onChange={onValueChanged} /></dd>
        </dl>
        <dl className="form-group">
            <dt><label>Server</label></dt>
            <dd><Input name="server" value={serviceServer} onChange={onValueChanged} /></dd>
        </dl>

        <div className="form-actions">
            <button className="btn btn-primary" onClick={onNext}>Save</button>
            { isNew ? <button className="btn" onClick={onBack}>Back</button> : null }
        </div>
    </Modal>
}

export default connect((state, ownProps) => ({
    serviceSource: state.services.getIn(['edit', 'service', 'source']),
    serviceName: state.services.getIn(['edit', 'service', 'name']),
    serviceServer: state.services.getIn(['edit', 'service', 'server']),
    isNew: state.services.getIn(['edit', 'type']) == 'new'
}), (dispatch, ownProps) => ({
    onBack: () => {
        dispatch(showModal(LOAD_SERVICES_MODAL))
        dispatch(hideModal(EDIT_SERVICE_MODAL))
    },
    onNext: () => dispatch(saveEditedService()),
    onValueChanged: (field, value) => dispatch(setEditingServiceField({ field, value }))
}))(EditServiceModal)
