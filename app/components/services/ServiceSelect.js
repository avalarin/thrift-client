import { React, connect, jss } from '~/deps'
import { showModal } from '~/actions/modals'
import { selectService, editSelectedService, createTabForSelectedService } from '~/actions/services'
import classnames from 'classnames'

const styles = {
    list: {
        width: '280px'
    },
    button: {
        marginLeft: '5px'
    }
}

const mapStateToProps = (state, ownProps) => ({
    services: state.services.get('list').toJS(),
    selectedIndex: state.services.get('selected')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onAdd: () => dispatch(showModal("loadServices")),
    onSelect: (index) => dispatch(selectService(index)),
    onEdit: () => dispatch(editSelectedService()),
    onCreateTab: () => dispatch(createTabForSelectedService())
})

@connect(mapStateToProps, mapDispatchToProps)
@jss(styles)
export default class ServiceSelect extends React.Component {
    render() {
        const { services, selectedIndex, onAdd, onSelect, onEdit, onCreateTab, sheet: { classes } } = this.props
        return <div>
            <select className={`form-select ${classes.list}`} value={selectedIndex} onChange={e => onSelect({index: e.target.selectedIndex})}>
                { services.map((service, i) => <option key={`service-${i}`} value={i}>{service.name}</option>) }
            </select>
            <button className={`btn ${classes.button}`} onClick={onAdd}>Add</button>
            <button className={`btn ${classes.button}`} onClick={onEdit}>Edit</button>
            <button className={`btn ${classes.button}`} onClick={onCreateTab}>Crate tab</button>
        </div>
    }
}