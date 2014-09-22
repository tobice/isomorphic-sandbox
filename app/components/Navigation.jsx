/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react');
var NavLink = require('flux-router-component').NavLink;
var RouterMixin = require('flux-router-component').RouterMixin;

var Navigation = React.createClass({

    render: function () {
        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <NavLink name="home" className="navbar-brand" context={this.props.context}>Isomorphic Sandbox</NavLink>
                        <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar-main">
                        <ul className="nav navbar-nav">
                            <li>
                                <NavLink name="page" navParams={{page: "strategy"}} context={this.props.context}>Strategy</NavLink>
                            </li>
                            <li>
                                <NavLink name="page" navParams={{page: "about"}} context={this.props.context}>About</NavLink>
                            </li>
                            <li>
                                <NavLink name="page" navParams={{page: "contact"}} context={this.props.context}>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Navigation;
