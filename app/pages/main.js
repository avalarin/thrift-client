import React from 'react'
import LoadServicesModal from '~/components/services/LoadServicesModal'
import EditServiceModal from '~/components/services/EditServiceModal'
import ServiceSelect from '~/components/services/ServiceSelect'
import Tabs from '~/components/controls/Tabs'
import classnames from 'classnames'
import jss from 'react-jss'

const styles = {
    page: {
        margin: '5px'
    },
    selectRow: {
        marginBottom: '5px'
    }
}

@jss(styles)
export default class MainPage extends React.Component {
    render() {
        let { sheet: { classes } } = this.props

        return <div className={classes.page}>
            <div className={classes.selectRow}>
                <ServiceSelect />
                <LoadServicesModal />
                <EditServiceModal />
            </div>

            <Tabs list="serviceTabs" componentSelector={ svc => <span>{JSON.stringify(svc)}</span> } />
        </div>
    }
}