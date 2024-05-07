import * as React from 'react';
import '../assets/index.css'

import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { ContributionsTable } from './ContributionsTable';
interface IAppProps {
}



export function Contributions(props: IAppProps) {
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
                {/* <header style={{
                    height: '600px'
                }}>
                    <div className="img"
                        style={{
                            background: `url(${require('../assets/8image.png')})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>

                    </div>
                </header> */}
                <div className="main contributions-part">
                    <main style={{
                        width: '100%'
                    }}>
                        <article style={{
                            width: '75%'
                        }}>
                            <div >
                                <h1>My Contributions</h1>
                                <ContributionsTable></ContributionsTable>
                            </div>
                            <img src={require('../assets/5image.png')} alt="" />

                            {/* <img src={require('../assets/2image.png')} alt="" /> */}
                            {/* <div className="multicol">
                                <p>Inside the
                                    script tag at the end of the body tag, JavaScript code is embedded.This code uses query
                                    selectors to retrieve elements from the page and implements scroll interaction effects using
                                    variables and event listeners.

                                    When a scroll event occurs, the display effects of the header and image are changed by
                                    calculating the scroll distance.By setting clip - path and transform scale, the dynamic
                                    changes in the shape of the header and the size of the image are achieved.As a result, when
                                    users scroll the page, animation effects are triggered, adding dynamism to the page.

                                    In conclusion, this code showcases a simple static webpage design.By combining HTML, CSS,
                                    and JavaScript, it achieves the layout of page elements and scroll interaction effects.From
                                    the overall structure of the page to specific style settings and animation implementation,
                                    each part is carefully designed to provide users with a pleasant browsing experience.The
                                    page appears clean and visually appealing, and the addition of dynamic effects enhances its
                                    vitality and attractiveness, capturing users' attention and conveying the intended message
                                    of the designer.</p>
                            </div> */}
                        </article>
                    </main>
                </div>
            </div>
        </div >
    );
}
