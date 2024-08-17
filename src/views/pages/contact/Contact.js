import React from 'react'
import Header from '../components/Header'
import feature from "../../../assets/images/features/02.png"
import "../home/css/bootstrap.min.css"
import "../home/css/animate.css"
import "../home/css/typography.css"
import "../home/css/style.css"
import "../home/css/responsive.css"
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

function Contact() {
    return (
        <React.Fragment>
            <Header />

            <section class="iq-breadcrumb text-left">
                <div class="container">
                    <div class="row">
                    <div class="col-lg-8 col-md-8 text-left mb-4 mb-lg-0 align-self-center">
                        <h2 class="title">Nous contacter</h2>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/"><i class="fa fa-home" aria-hidden="true"></i>Accueil</a></li>
                                <li class="breadcrumb-item active">Nous contacter</li>
                            </ol>
                        </nav>
                    </div>
                    <div class="col-lg-4 col-md-4 text-right">
                        <img  src={feature} class="img-fluid" alt="feature"/>
                    </div>
                    </div>
                </div>
            </section>

            <div class="main-content">
                <section class="iq-contactus gray-bg">
                    <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <iframe class="w-100 contact-ifream" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.840289118572!2d144.95373631550405!3d-37.81720974201396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sin!4v1543402448828"  allowfullscreen></iframe>
                        </div>
                        <div class="col-lg-6">
                            <div class="title-box  text-left">
                                <span style={{color: "#009AD7"}}>Nous écrire</span>
                                <h2 class="title">Contactez nous</h2>
                                <p class="mb-0">Veuillez remplir ce formulaire</p>
                            </div>
                            <form  class="contact-us" id="contact" method="post">
                                <div class="row">
                                <div class="col-md-6">
                                    <label>Votre nom<br/>
                                    <span class="form-control-wrap your-name">
                                    <input type="text" name="name" Placeholder="Nom" class="form-control text" aria-required="true" aria-invalid="false"/></span>
                                    </label>
                                </div>
                                <div class="col-md-6">
                                    <label>Votre Email<br/>
                                    <span class="form-control-wrap your-email">
                                    <input type="email" name="email" Placeholder="Email" class="form-control text email" aria-required="true" aria-invalid="false"/></span>
                                    </label>
                                </div>
                                <div class="col-xl-12">
                                    <label>Objet<br/>
                                    <span class="form-control-wrap your-subject">
                                    <input type="text" name="subject" Placeholder="Objet" class="form-control text" aria-invalid="false"/></span>
                                    </label>
                                </div>
                                <div class="col-xl-12">
                                    <label>Votre Message<br/>
                                    <span class="form-control-wrap your-message">
                                    <textarea name="message" Placeholder="Message" class="form-control textarea" aria-invalid="false"></textarea></span>
                                    </label>
                                </div>
                                <div class="col-xl-12">
                                    <button id="submit" name="submit" type="submit" value="Envoyer" class="button-primary" >Envoyer</button>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </section>
         
                <section class="overview-block-ptb">
                    <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="title-box  text-center">
                                <span style={{color: "#009AD7"}}>Nous contactez</span>
                                <h2 class="title">Informations</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="iq-fancy-box text-center">
                                <div class="iq-icon">
                                <i aria-hidden="true" class="ion ion-ios-location-outline"></i>
                                </div>
                                <div class="fancy-content">
                                <h4>Notre Adresse</h4>
                                <p>Beedi, Douala. Cameroun</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="iq-fancy-box text-center">
                                <div class="iq-icon">
                                <i aria-hidden="true" class="ion ion-ios-email-outline"></i>
                                </div>
                                <div class="fancy-content">
                                <h4>Notre Adresse Mail</h4>
                                <p>contact@gesco-app.com<br/>
                                    yanou.yehiel@yahoo.com
                                </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="iq-fancy-box text-center">
                                <div class="iq-icon">
                                <i aria-hidden="true" class="ion ion-ios-telephone-outline"></i>
                                </div>
                                <div class="fancy-content">
                                <h4>Nos numéros de téléphone</h4>
                                <p>+237 694 750 509<br/>
                                    +225 07 58 23 95 93
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
      
            <Newsletter />

            <Footer />
        </React.Fragment>
    )
}

export default Contact