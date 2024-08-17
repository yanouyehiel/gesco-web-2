import React from 'react'
import logo5 from "../../../assets/images/logo_bleu_sans_bg.png"

function Footer() {
    return (
        <footer>       
            <div class="container">
            <div class="footer-top mt-5">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="footer-logo">
                            <a href="#">
                                <img class="img-fluid" src={logo5} alt="logo" />
                            </a>
                        </div>
                        <div class="widget">
                            <div class="textwidget">
                                <p>GescoApp le logiciel qui vous facilite la gestion de votre école.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="widget">
                        <h4 class="footer-title contact-info">Nous contacter</h4>
                        <ul class="iq-contact">
                            <li>
                                <a href="tel:+237694750509"><i class="fas fa-phone"></i>+237 694 750 509</a>
                            </li>
                            <li>
                                <a href="mailto:contact@gesco-app.com"><i class="fas fa-envelope"></i>contact@gesco-app.com</a>
                            </li>
                            <li>
                            </li>
                            <li>
                                <p><i class="fas fa-map-marker-alt"></i>Beedi, Douala. Cameroun</p>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div class="copyright-footer pb-3 pt-3">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 mb-2 mb-lg-0">
                            <span class="copyright">Copyright 2024 GescoApp All Rights Reserved.</span>
                        </div>
                        <div class="col-lg-6 col-md-6">
                            <div class="social-icone">
                                <ul>
                                    <li class="d-inline"><a href="https://www.facebook.com/"><i class="fab fa-facebook-f"></i></a> </li>
                                    <li class="d-inline"><a href="https://twitter.com/"><i class="fab fa-twitter"></i></a></li>
                                    <li class="d-inline"><a href="https://plus.google.com/"><i class="fab fa-google-plus-g"></i></a></li>
                                    <li class="d-inline"><a href="https://www.instagram.com/"><i class="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </footer>
    )
}

export default Footer