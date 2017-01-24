import { React, connect, jss } from '~/deps'

const styles = { }

const mapStateToProps = (state, ownProps) => ({
    tabs: lists.getItems(state, ownProps.list)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSelect: (index) => dispatch(selectItem({ list: ownProps.list, index }))
})

@connect(mapStateToProps, mapDispatchToProps)
@jss(styles)
export default const Sender = () => {

}