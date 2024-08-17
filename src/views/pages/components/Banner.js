import React from 'react'
import slider1 from "../../../assets/images/slider/slider-1.png"

function Banner() {
    return (
        <div class="iq-banner iq-slider-3" style={{marginTop:-100}}>
            <div class="container">
                <div class="row slider-row justify-content-between">
                    <div class="col-lg-6 align-self-center overview-block-pl">
                        <div class="slider-banner">
                        <h2 class="text-uppercase mb-3">LE LOGICIEL PARFAIT<br />POUR VOTRE ECOLE.</h2>
                        <p class="pr-lg-4">L'application web et mobile GescoApp vient vous faciliter la tache
                            dans le processus de gestion efficace de votre établissement scolaire.
                        </p>
                        <a href="#/register" class="btn slide-button button">Commencez </a>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="slider-image-3 slide-3">
                            <div class="slider-2"></div>
                            <div class="slider-3"></div>
                            <div class="slider-4"></div>
                            <img class="banner-img img-fluid center-block" src={slider1} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner