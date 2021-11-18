import { History, createBrowserHistory } from 'history'

import { RouteStateProps } from './types'

type ReadonlyBrowserHistory<S> = Readonly<History<S>>
const browserHistory: ReadonlyBrowserHistory<RouteStateProps> = createBrowserHistory()

export default browserHistory
