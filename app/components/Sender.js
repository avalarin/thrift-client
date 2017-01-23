import React from 'react'
import { connect } from 'react-redux'

const styles = { }

const Sender = () => {

}

export default connect((state, ownProps) => ({
    tabs: lists.getItems(state, ownProps.list)
}), (dispatch, ownProps) => ({
    onSelect: (index) => dispatch(selectItem({ list: ownProps.list, index }))
}))(jss(styles)(Tabs))
