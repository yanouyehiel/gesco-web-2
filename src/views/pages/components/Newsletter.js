import React from 'react'

function Newsletter() {
    return (
        <div class="footer-subscribe">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <h3 class="subscribe-heading">Notre Newsletter</h3>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-fields">
                            <input type="email" name="EMAIL" placeholder="Votre Email" required="" />
                            <a class="button btn-primary">Souscrire</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter