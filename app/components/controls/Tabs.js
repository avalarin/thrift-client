import React from 'react'
import { connect } from 'react-redux'
import * as lists from '~/selectors/lists'
import { selectItem } from '~/actions/lists'
import classnames from 'classnames'
import jss from 'react-jss'

const styles = {
    content: {
        margin: '5px'
    }
 }

class Tabs extends React.Component {
    renderTab(tab, index) {
        let cn = classnames({
            'tabnav-tab': true,
            'selected': index == this.props.selectedIndex
        })
        let onSelect = this.props.onSelect

        return <a href="#" key={`tab-${index}`} onClick={() => onSelect(index)} className={cn}>{tab.name}</a>
    }

    render() {
        const { tabs, componentSelector, selected, sheet: { classes } } = this.props

        return <div>
            <div className="tabnav">
                <nav className="tabnav-tabs">
                    { tabs.map((tab, i) => this.renderTab(tab, i)) }
                </nav>
            </div>
            <div className={classes.content}>
                { (componentSelector && selected) ? componentSelector(selected) : null }
            </div>
        </div>
    }
}

export default connect((state, ownProps) => ({
    tabs: lists.getItems(state, ownProps.list),
    selectedIndex: lists.getSelectedIndex(state, ownProps.list),
    selected: lists.getSelectedItem(state, ownProps.list)
}), (dispatch, ownProps) => ({
    onSelect: (index) => dispatch(selectItem({ list: ownProps.list, index }))
}))(jss(styles)(Tabs))
