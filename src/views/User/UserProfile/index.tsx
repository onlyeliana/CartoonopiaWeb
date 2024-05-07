import * as React from 'react';
import '../assets/index.css'
import SimpleFavouriteTable from '../Favourites/simpleFavouriteTable';
import { ContributionsTable } from '../Contributions/ContributionsTable';
interface IAppProps {
}

export function UserProfile(props: IAppProps) {

    return (
        <div>
            <div className="mini-header" style={{
                position: 'sticky',
                top: 0
            }} id="mini-header">
                <div className="nav-link">
                    <ul className="nav-link-ul">
                        <li className="nav-link-item">
                            <a className="link" href="/#/userprofile" id="nav-anime">profile</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/userfavourites" id="nav-game">favourites</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/usercontributions" id="nav-game">contributions</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/usercommunity" id="nav-live">community</a>
                        </li>
                        <li className="nav-link-item"><a className="link" href="/#/user/userprofile" id="nav-live">return</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="shell">
                <header>
                    <div className="img"></div>
                </header>
                <div className="main profile-home">
                    <main>
                        <article>
                            <div className="favourite-part characters-list">
                                <h1>Favorite characters</h1>
                                <SimpleFavouriteTable></SimpleFavouriteTable>

                            </div>
                            <img src={require('../assets/3image.png')} alt="" />

                            <div className="contributions-part request-part">
                                <h1>Contributions</h1>
                                <ContributionsTable></ContributionsTable>
                            </div><img src={require('../assets/2image.png')} alt="" />

                        </article>
                    </main>
                </div>
            </div>
        </div >
    );
}
