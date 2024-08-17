import React, { useEffect } from 'react'
import carousel1 from "../../../assets/images/carousel1.png"
import carousel2 from "../../../assets/images/carousel2.png"
import carousel4 from "../../../assets/images/carousel4.png"
import carousel5 from "../../../assets/images/carousel5.png"
import "./css/bootstrap.min.css"
import "./css/animate.css"
import "./css/typography.css"
import "./css/style.css"
import "./css/responsive.css"

import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import logo1 from "../../../assets/images/Logo IconeApp Black v2 Prop 1@4x.png"
import logo2 from "../../../assets/images/Logo IconeApp Blanc v2 Prop 1@4x.png"
import logo3 from "../../../assets/images/Logo IconeApp Color v2 Prop 1@4x.png"
import logo4 from "../../../assets/images/logo_blanc.png"
import logo5 from "../../../assets/images/logo_bleu_sans_bg.png"
import logo6 from "../../../assets/images/logo_noir_sans_bg.png"
import presence from "../../../assets/images/services/presences.png"
import parents from "../../../assets/images/services/parents.png"
import calendrier from "../../../assets/images/services/calendrier.png"
import enseignement from "../../../assets/images/services/cours.png"
import bulletin from "../../../assets/images/services/bulletin.png"
import pension from "../../../assets/images/services/pensions.png"
import feature1 from "../../../assets/images/features/1.png"
import tarifs from "../../../assets/images/features/tarifs.png"
import effect from "../../../assets/images/effect/dotted-pattern-black.png"
import Newsletter from '../components/Newsletter'

function home() {
    
    return (
        <React.Fragment>

            <Header />

            <Banner />

            <div class="main-content">
         
                {/* <section class="iq-client gray-bg">
                    <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <div class="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="false" data-items="5" data-items-laptop="5" data-items-tab="4" data-items-mobile="2" data-items-mobile-sm="1" data-margin="30">
                                <div class="item">
                                    <div class="clients-box">
                                        <img class="img-fluid client-img" src={logo1} alt="#"/>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="clients-box">
                                        <img class="img-fluid client-img" src={logo2} alt="#"/>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="clients-box">
                                        <img class="img-fluid client-img" src={logo3} alt="#"/>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="clients-box">
                                        <img class="img-fluid client-img" src={logo4} alt="#"/>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="clients-box">
                                        <img class="img-fluid client-img" src={logo5} alt="#"/>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="clients-box">
                                        <img class="img-fluid client-img" src={logo6} alt="#"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section> */}
                
                <section class="choose-services">
                    <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="title-box text-center">
                                <span style={{color: "#009AD7"}}>Meilleur logiciel de gestion scolaire</span>
                                <h2 class="title">Quelques fonctionnalités</h2>
                                <p class="mb-0">GescoApp possède des dizaines de fonctionnalités vous permettant de gérer efficacement votre établissement.</p>
                                <p>En voici quelques unes.</p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 mb-5 mb-lg-0">
                            <div class="choose-services text-center">
                                <div class="choose-img mb-4">
                                <img src={pension} alt="pension"/>
                                </div>
                                <h4 class="mb-2">Gestion de la scolarité</h4>
                                <p class="mb-3">Paiement de la scolarité,
                                    génération du doublon du
                                    reçu et visualisation de tous
                                    les paiements effectués par
                                    l’élève et les éventuels
                                    restes.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-5 mb-lg-0">
                            <div class="choose-services text-center">
                                <div class="choose-img mb-4">
                                <img src={enseignement} alt="enseignement"/>
                                </div>
                                <h4 class="mb-2">Gestion des enseignements</h4>
                                <p class="mb-3">Elle englobe entre autres la gestion des matières, la gestion des cours et des devoirs.
                                    Ici l'afministrateur peut enregistrer des données, les voir et les rendre disponible auprès d'autres acteurs 
                                    tels que les parents et/ou enseignants.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="choose-services text-center">
                                <div class="choose-img mb-4">
                                <img src={bulletin} alt="bulletin"/>
                                </div>
                                <h4 class="mb-2">Gestion des évaluations</h4>
                                <p class="mb-3">Elle englobe la plannification des examens ou évaluations, l'enregistrement des notes, la modification et la suppression de ceux-ci
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 mb-5 mb-lg-0">
                            <div class="choose-services text-center">
                                <div class="choose-img mb-4">
                                <img src={presence} alt="pension"/>
                                </div>
                                <h4 class="mb-2">Gestion des présences & assiduité</h4>
                                <p class="mb-3">Enregistrement des cours et des présences de tous les élèves.
                                    Rendre disponible toutes ces informations auprès de l'administration et des parents des élèves.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-5 mb-lg-0">
                            <div class="choose-services text-center">
                                <div class="choose-img mb-4">
                                <img src={calendrier} alt="enseignement"/>
                                </div>
                                <h4 class="mb-2">Gestion du calendrier scolaire</h4>
                                <p class="mb-3">Enregistrement de tous les évènements à venir de l'établissement, les rendre disponible auprès des enseignants et parents. Possibilité de les visualiser
                                    à l'approche de chaque date dans un tableau clair et précis.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="choose-services text-center">
                                <div class="choose-img mb-4">
                                <img src={parents} alt="bulletin"/>
                                </div>
                                <h4 class="mb-2">Gestion des parents &amp; élèves</h4>
                                <p class="mb-3">Enregistrement des parents d'élèves. Possibilité de les lier avec leurs enfants et leur
                                     envoyer des informations.
                                </p>
                            </div>
                        </div>
                    </div>
                    <a class="btn-link" href='./src/views/pages/home/GESCO Application pesentation.pdf' download={true}>Télécharger le document de présentation</a>
                    </div>
                </section>
                
                <section class="need-browser overview-block gray-bg">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <img src={feature1} class="img-fluid center-block" alt="feature1"/>
                                <div class="iq-objects-style-1">
                                    <span class="iq-objects-01" data-bottom="transform:translatey(-50px)" data-top="transform:translatey(-50px);">
                                        <img src={effect} alt="drive02"/>
                                    </span>
                                    <span class="iq-objects-02" data-bottom="transform:translatey(50px)" data-top="transform:translatey(-100px);">
                                        <img src={effect} alt="drive02"/>
                                    </span>
                                    <span class="iq-objects-03" data-bottom="transform:translatex(50px)" data-top="transform:translatex(-100px);">
                                        <img src={effect} alt="drive02"/>
                                    </span>
                                </div>
                            </div>
                            <div class="col-lg-6 align-self-center">
                                <div class="title-box  text-left iq-rmt-0">
                                    <span style={{color: "#009AD7"}}>Pourquoi Choisir GescoApp</span>
                                    <h2 class="title">Les avantages de GescoApp</h2>
                                    
                                </div>
                                <ul class="iq-list">
                                    <li><i class="fa fa-check-circle"></i><span>Automatisation des processus</span></li>
                                    <li><i class="fa fa-check-circle"></i><span>Accessibilité</span></li>
                                    <li><i class="fa fa-check-circle"></i><span>Suivi en temps réel</span></li>
                                    <li><i class="fa fa-check-circle"></i><span>Sécurité des données</span></li>
                                </ul>
                                <a class="button " href="#/contact">En savoir plus</a>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section class="iq-development-box overview-block">
                    <div class="container">
                    <div class="row flex-row-reverse">
                        <div class="col-lg-6">
                            <div class="deshbord-image">
                                <img src={carousel4} class="img-fluid" alt="#"/>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="development-box text- mb-5">
                                <div class="development-image ">
                                <img src={logo1} width={80} height={80} alt="fancybox"/>
                                </div>
                                <div class="development-info">
                                <h4>Application Web</h4>
                                <p class="mb-0">Grâce seulement à votre navigateur web et une connexio internet vous pouvez avoir accès au logiciel GescoApp</p>
                                </div>
                            </div>
                            <div class="development-box text- mb-5">
                                <div class="development-image ">
                                <img src={logo3} width={80} height={80} alt="fancybox"/>
                                </div>
                                <div class="development-info">
                                <h4 style={{color: '#48BB8C'}}>Application Mobile</h4>
                                <p class="mb-0">Une version mobile de GescoApp est disponible pour les enseignants et les parents d'élèves</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
                
                <section id="great-screenshots" class="iq-screenshots gray-bg">
                    <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="title-box  text-center">
                                <span style={{color: "#009AD7"}}>Screenshot</span>
                                <h2 class="title">Notre vitrine</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-sm-12">
                            <div class="screenshots-slider popup-gallery">
                                <div class="slider-container">
                                <div class="slider-content">
                                    <div class="slider-single">
                                        <a href={carousel1} class="popup-img"><img class="slider-single-image" src={carousel1} alt="1" /></a>
                                    </div>
                                    <div class="slider-single">
                                        <a href={carousel2} class="popup-img"><img class="slider-single-image" src={carousel2} alt="2" /></a>
                                    </div>
                                    <div class="slider-single">
                                        <a href={carousel4} class="popup-img"><img class="slider-single-image" src={carousel4} alt="3" /></a>
                                    </div>
                                    <div class="slider-single">
                                        <a href={carousel5} class="popup-img"><img class="slider-single-image" src={carousel5} alt="4" /></a>
                                    </div>
                                </div>
                                <a class="slider-left" href="javascript:void(0);"><i class="fa fa-angle-left"></i></a>
                                <a class="slider-right" href="javascript:void(0);"><i class="fa fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
                
                <section  class="pricing-plan">
                    <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="title-box  text-center">
                                <span style={{color: "#009AD7"}}>Tarifs</span>
                                <h2 class="title">Nos plans tarifaires</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-md-3 mb-lg-0 mb-5">
                            <div class="iq-pricing text-center ">
                                <div class="priceing-title ">
                                <img alt="#" class="img-fluid mb-3" src={tarifs} />
                                <h4>25000 FCFA</h4>
                                <h4 class="title mb-3">Plan mensuel</h4>
                                </div>
                                <ul class="pricing-list">
                                <li class="pricing-features-item disable">
                                    Toutes les fonctionnalités
                                </li>
                                <li>Maintenance</li>
                                <li>Formation</li>
                                </ul>
                                <a class="button" href="#/contact" role="button">Souscrire</a>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-3 mb-lg-0 mb-5">
                            <div class="iq-pricing text-center ">
                                <div class="priceing-title ">
                                <img alt="#" class="img-fluid mb-3" src={tarifs} />
                                <h4>200000 FCFA</h4>
                                <h4 class="title mb-3">Plan annuel</h4>
                                </div>
                                <ul class="pricing-list">
                                <li class="pricing-features-item disable">
                                    Toutes les fonctionnalités
                                </li>
                                <li>Maintenance</li>
                                <li>Formation</li>
                                </ul>
                                <a class="button" href="#/contact" role="button">Souscrire</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
                
                <section  class="our-clients gray-bg">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="title-box  text-center">
                                    <span style={{color: "#009AD7"}}>Nos témoignages clients</span>
                                    <h2 class="title">Ce que disent nos clients satisfaits</h2>
                                    <p class="mb-0">Bientôt disponible</p>
                                </div>
                            </div>
                        </div>
                        {/* <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="3" data-items-laptop="3" data-items-tab="2" data-items-mobile="1" data-items-mobile-sm="1" data-margin="30">
                                    <div class="item">
                                    <div class="iq-testimonial">
                                        <div class="testimonial-img">
                                            <img  class="img-fluid rounded-circle" src="./images/testimonial/01.jpg" alt="#" />
                                        </div>
                                        <div class="testimonial-info">
                                            <div class="testimonial-name">
                                                <h5>Richardson</h5>
                                                <span class="sub-title">Developer, Bizbag</span>
                                            </div>
                                        </div>
                                        <p>“Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a over 2000 years old.”</p>
                                    </div>
                                    </div>
                                    <div class="item">
                                    <div class="iq-testimonial">
                                        <div class="testimonial-img">
                                            <img alt="#" class="img-fluid rounded-circle" src="./images/testimonial/02.jpg" />
                                        </div>
                                        <div class="testimonial-info">
                                            <div class="testimonial-name">
                                                <h5>Morales</h5>
                                                <span class="sub-title">Designer, CEO
                                                </span>
                                            </div>
                                        </div>
                                        <p>“Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a over 2000 years old.”</p>
                                    </div>
                                    </div>
                                    <div class="item">
                                    <div class="iq-testimonial">
                                        <div class="testimonial-img">
                                            <img alt="#" class="img-fluid rounded-circle" src="./images/testimonial/03.jpg" />
                                        </div>
                                        <div class="testimonial-info">
                                            <div class="testimonial-name">
                                                <h5>Kelly</h5>
                                                <span class="sub-title">Designer, Co-Founder</span>
                                            </div>
                                        </div>
                                        <p>“Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a over 2000 years old.”</p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
                
                <section id="our-blog" class="blog">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="title-box text-center">
                                    <span style={{color: "#009AD7"}}>Le Blog GescoApp</span>
                                    <h2 class="title">Nos thèmes principaux</h2>
                                    <p class="mb-0">Bientôt disponible</p>
                                </div>
                            </div>
                        </div>
                        {/* <div class="row">
                            <div class="col-lg-12 col-md-12">
                                <div class="owl-carousel" data-autoplay="true" data-loop="true" data-nav="false" data-dots="true" data-items="3" data-items-laptop="3" data-items-tab="2" data-items-mobile="1" data-items-mobile-sm="1" data-margin="30">
                                    <div class="item">
                                    <div class="iq-blog-box">
                                        <div class="iq-blog-image clearfix">
                                            <img src="./images/blog/01.jpg" class="img-fluid center-block" alt="blogimage0" />
                                            <ul class="iq-blogtag">
                                                <li><a href="#">Technology</a></li>
                                            </ul>
                                        </div>
                                        <div class="iq-blog-detail">
                                            <div class="iq-blog-meta">
                                                <ul>
                                                <li class="list-inline-item">
                                                    <a href="#" class="main-color" rel="bookmark">May 18, 2019</a>
                                                </li>
                                                </ul>
                                            </div>
                                            <div class="blog-title">
                                            <a href="blog-details.html">
                                                <h5>Construction industry</h5>
                                                </a>
                                            </div>
                                            <p>They bring to you a host of created infographics that contain the latest digital marketing </p>
                                            <a class="btn-link" href="blog-details.html">Read More<i class="fa fa-angle-right" aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="item">
                                    <div class="iq-blog-box">
                                        <div class="iq-blog-image clearfix">
                                            <img src="./images/blog/02.jpg" class="img-fluid center-block" alt="blogimage1" />
                                            <ul class="iq-blogtag">
                                                <li><a href="#">Business</a></li>
                                            </ul>
                                        </div>
                                        <div class="iq-blog-detail">
                                            <div class="iq-blog-meta">
                                                <ul>
                                                <li class="list-inline-item">
                                                    <a href="#" class="main-color" rel="bookmark">May 18, 2019</a>
                                                </li>
                                                </ul>
                                            </div>
                                            <div class="blog-title">
                                            <a href="blog-details.html">
                                                <h5>Life Lack Meaning</h5>
                                                </a>
                                            </div>
                                            <p>If you are keen on knowing new things about the digital marketing industry then Marketing Land.</p>
                                            <a class="btn-link" href="blog-details.html">Read More<i class="fa fa-angle-right" aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="item">
                                    <div class="iq-blog-box">
                                        <div class="iq-blog-image clearfix">
                                            <img src="./images/blog/03.jpg" class="img-fluid center-block" alt="blogimage2" />
                                            <ul class="iq-blogtag">
                                                <li><a href="#">Design</a></li>
                                            </ul>
                                        </div>
                                        <div class="iq-blog-detail">
                                            <div class="iq-blog-meta">
                                                <ul>
                                                <li class="list-inline-item">
                                                    <a href="#" class="main-color" rel="bookmark">May 18, 2019</a>
                                                </li>
                                                </ul>
                                            </div>
                                            <div class="blog-title">
                                            <a href="blog-details.html">
                                                <h5>Content Marketing</h5>
                                                </a>
                                            </div>
                                            <p>Content Marketing  offers some of the best advice around in terms of how content can help your brand.</p>
                                            <a class="btn-link" href="blog-details.html">Read More<i class="fa fa-angle-right"  aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>

                <Newsletter />
            </div>

            <Footer />

            <div id="back-to-top">
                <a class="top" id="top" href="#"> <i class="ion-ios-arrow-up"></i> </a>
            </div>
            
        </React.Fragment>
    )
}

export default home