import { React, connect, jss } from '~/deps'
import { hideModal } from '~/actions/modals'
import { isVisible } from '~/selectors/modals'
import classNames from 'classnames'

const styles = {
    backdrop: {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom:'0',
        left: '0',
        zIndex: '1050',
        background: 'rgba(0, 0, 0, 0.5)',

        display: 'none'
    },
    backdropVisible: {
        display: 'block'
    },
    dialog: { 
        maxWidth: '600px',
        margin: '3rem auto',
        background: 'white'
    },
    header: {
        padding: '1rem',
        borderBottom: '1px solid #e5e5e5',

        '& h3': { margin: 0, display: 'inline' }
    },
    content: {
        padding: '1rem',
    },
    closeButton: {
        float: 'right',
        fontSize: '1.5rem',
        fontWeight: '700',
        lineHeight: '1',
        color: '#333',
        width: '24px',
        textAlign: 'center',
        '&:hover': {
            textDecoration: 'none',
            color: '#fff',
            backgroundColor: '#333',
            borderRadius: '50%'
        }
    }
}

const mapStateToProps = (state, ownProps) => ({
    isVisible: isVisible(state, ownProps.name)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose: () => dispatch(hideModal(ownProps.name))
})

@connect(mapStateToProps, mapDispatchToProps)
@jss(styles)
export default class Modal extends React.Component {
    render() {
        const { isVisible, name, header, children, sheet: {classes},
                onClose } = this.props

        let cn = {
            [classes.backdrop]: true,
            [classes.backdropVisible]: isVisible
        }

        return <div className={classNames(cn)}>
            <div className={classes.dialog}>
                <div className={classes.header}>
                    <h3>{header}</h3>
                    <a href="javascript:" className={classes.closeButton} onClick={onClose}>×</a>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </div>
    }
}