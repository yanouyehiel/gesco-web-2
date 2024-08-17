import React from 'react'
import logo from "../../../assets/images/logo_sans_bg.png"

function Header() {
    return (
        <header id="main-header" class="header-one">
            <nav id="menu-1" class="mega-menu" data-color="">
                <div class="menu-list-items">
                    <div class="container-fluid">
                <div class="row">
                <div class="col-sm-12">
                    <ul class="menu-logo">
                        <li>
                            <a href="#">
                                <img src={logo} alt="logo" class="img-fluid" />
                            </a>
                        </li>
                    </ul>
                    <ul class="menu-links">
                        <li class="active">
                            <a href="/">ACCUEIL</a>
                        </li>
                        <li>
                            <a href="#/contact">NOUS CONTACTER</a>
                        </li>
                        <li><a href="#/login">SE CONNECTER</a></li>
                        <li><a class="button button-primary" href="#/register">COMMENCEZ</a></li>
                    </ul>
                </div>
            </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header