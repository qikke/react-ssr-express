import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import AppState from '../../store/app-state'


@inject('appState') @observer
export default class TopicList extends React.Component {
  componentDidMount() { }

  render() {
    const { appState } = this.props
    return (
      <div>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
        </Helmet>
        {appState.msg}
        <Button color="primary">
          Hello,
        </Button>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
