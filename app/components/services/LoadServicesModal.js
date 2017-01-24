import { React, connect, jss } from '~/deps'
import Modal from '~/components/controls/Modal'
import Alert from '~/components/controls/Alert'
import LoadingIndicator from '~/components/controls/LoadingIndicator'
import { showModal, hideModal, LOAD_SERVICES_MODAL, EDIT_SERVICE_MODAL } from '~/actions/modals'
import { saveSelectedTempServices, loadTempServices, selectTempService, setTempUrl, editSelectedTempService } from '~/actions/services'
import classnames from 'classnames'

const styles = {
    list: {
      'margin-top': '15px',
      height: '280px',
      'overflow-y': 'scroll'
    },
    alert: {
        'margin-top': '15px',
        'margin-bottom': '15px'
    },
    table: {
        width: '100%'
    },
    buttons: {
        'width': '106px',
        'paddingLeft': '5px'
    }
}

const mapStateToProps = (state, ownProps) => ({
    url: state.services.getIn(['temp', 'url']),
    services: state.services.getIn(['temp', 'list']).toJS(),
    selected: state.services.getIn(['temp', 'selected']),
    error: state.services.getIn(['temp', 'error']),
    loading: state.services.getIn(['temp', 'loading'])
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeUrl: (url) => dispatch(setTempUrl(url)),
    onLoad: () => dispatch(loadTempServices()),
    onSelect: (index) => dispatch(selectTempService(index)),
    onNext: () => {
        dispatch(hideModal(LOAD_SERVICES_MODAL))
        dispatch(editSelectedTempService())
    }
})

@connect(mapStateToProps, mapDispatchToProps)
@jss(styles)
export default class LoadServicesModal extends React.Component {
    render() {
        const { services, selected, error, loading, 
                 onLoad, onSelect, onNext, onChangeUrl,
                 sheet: {classes} } = this.props
        let content;
        if (loading) {
            content = <LoadingIndicator />
        } else if (error) {
            content = <Alert type="error" header="Error occurred" error={error} />
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

        return <Modal name={LOAD_SERVICES_MODAL} header="Load thrift">
            <table className={classes.table}>
                <tbody>
                    <tr>
                        <td>
                            <input className="form-control input-block" placeholder="URL" type="text" onChange={e => onChangeUrl(e.target.value)} />
                        </td>
                        <td className={classes.buttons}>
                            <span> </span>
                            <button className="btn">...</button>
                            <span> </span>
                            <button className="btn" onClick={onLoad}>Load</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            { content }

            <div className="form-actions">
                <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
        </Modal>
    }
}