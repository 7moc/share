// ==UserScript==
// @name         简化亚马逊和1688网址
// @namespace    http://tampermonkey.net/
// @version      1.12
// @description  Automatically simplify Amazon and 1688 URLs to include just the essential parts on page load.
// @author       You
// @match        https://www.amazon.com/*/dp/*
// @match        https://detail.1688.com/offer/*
// @match        https://*.1688.com/page/*
// @updateURL    https://raw.githubusercontent.com/7moc/share/master/monkey/simple_1688_amazon_url.user.js
// @downloadURL  https://raw.githubusercontent.com/7moc/share/master/monkey/simple_1688_amazon_url.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to simplify Amazon URLs to include just the ASIN
    function simplifyAmazonURL() {
        var ASIN = document.getElementById('ASIN') ? document.getElementById('ASIN').value : null;
        if (!ASIN) {
            var regexResult = window.location.href.match(/\/dp\/([A-Z0-9]{10})/);
            ASIN = regexResult ? regexResult[1] : null;
        }

        if (ASIN) {
            try {
                var simplifiedURL = `https://www.amazon.com/dp/${ASIN}`;
                if (window.location.href !== simplifiedURL) {
                    history.replaceState({}, '', simplifiedURL);
                    console.log("Browser URL updated to simplified version:", simplifiedURL);
                }
            } catch (error) {
                console.error("Failed to update browser URL", error);
            }
        }
    }

    // Function to simplify 1688 URLs by removing the ?spm parameter
    function simplify1688URL() {
        let url = new URL(window.location.href);
        let pathname = url.pathname;

        // Construct the new URL without the ?spm parameter
        let newUrl = url.origin + pathname;

        // Replace the current URL with the new one if they are different
        if (window.location.href !== newUrl) {
            history.replaceState({}, '', newUrl);
            console.log("Browser URL updated to simplified version:", newUrl);
        }
    }

    // Initial URL simplification on page load
    function simplifyURLOnLoad() {
        if (window.location.hostname === 'www.amazon.com') {
            simplifyAmazonURL();
        } else if (window.location.hostname.endsWith('.1688.com')) {
            simplify1688URL();
        }
    }

    // Run the simplification function on page load
    simplifyURLOnLoad();
})();