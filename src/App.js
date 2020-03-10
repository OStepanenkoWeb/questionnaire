import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import {connect} from 'react-redux'
import Logout from "./components/Logout/Logout"


class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/quiz/:id"} component={Quiz}/>
                <Route path={"/"} component={QuizList}/>
                <Redirect to="/"/>
            </Switch>
        )

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path={"/quiz/:id"} component={Quiz}/>
                    <Route path={"/quiz-creator"} component={QuizCreator}/>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/"} component={QuizList}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }
        return (
            <Layout>
                { routes }
            </Layout>
        )
    }
}

function mapStateToProps(state) {

    return {
        isAuth: !!state.auth.token
    }
}

export default connect(mapStateToProps)(App)
