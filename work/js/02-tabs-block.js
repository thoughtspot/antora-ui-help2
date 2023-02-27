;(function () {
  'use strict'

  const DEBUG = false
  var lastHash

  const windowHash = window.location.hash
  const hashToTab = new Map()
  find('.doc .tabset').forEach(function (tabset) {
    DEBUG && console.log('tabs-block initializing tabset ' + tabset.id)
    let active
    const tabs = tabset.querySelector('.tabs')
    if (tabs) {
      let first
      //With asciidoctor 2, we can use selector 'li.tab'
      find('.tabs > ul > li', tabs).forEach(function (tab, idx) {
        const tabHash = getTabHash(tab)
        if (!tabHash) return
        DEBUG && console.log('tabs-block considering tab/li ' + tabHash)
        const pane = getPane(tabHash, tabset)
        //With asciidoctor 2, we can use selector 'li.tab'
        const nesting = find('.tabs > ul > li', pane)
        DEBUG && console.log('tabs-block nesting in pane: ', nesting)
        nesting.forEach(function (descendant) {
          const descendantHash = getTabHash(descendant)
          if (descendantHash) {
            let descendantInfo = hashToTab.get(descendantHash)
            if (!descendantInfo) {
              descendantInfo = { ancestors: new Set() }
              hashToTab.set(descendantHash, descendantInfo)
            }
            descendantInfo.ancestors.add(tabHash)
          }
        })
        if (!idx) first = { tab: tab, pane: pane }
        const activator = activateTab.bind({ tabset: tabset, tab: tab, pane: pane, hashToTab })
        hashToTab.set(tabHash, Object.assign({ tab, activator }, hashToTab.get(tabHash)))
        if (windowHash === tabHash) {
          active = activator
        }
        tab.addEventListener('click', activator)
      })
      if (first) {
        DEBUG && console.log('tabs-block first', first)
        first.tab.classList.add('is-active')
        if (first.pane) first.pane.classList.add('is-active')
      }
    }
    active && active()
    tabset.classList.remove('is-loading')
  })
  window.addEventListener('hashchange', onHashChange.bind({ hashToTab }), false)

  window.addEventListener('load', function hashChangeOnLoad (e) {
    DEBUG && console.log('tabs-block hashChangeOnLoad: location: ', window.location)
    let tabInfo
    if ((tabInfo = hashToTab.get(window.location.hash))) {
      lastHash = undefined
      window.location.fragmentJumper = { target: tabInfo.tab }
      tabInfo.activator()
    }
    window.removeEventListener('load', hashChangeOnLoad)
  })

  function activateTab (e, skipAncestors) {
    const tab = this.tab
    const pane = this.pane
    const tabsetHash = '#' + this.tabset.id
    find(tabsetHash + ' > .content > .tabs li, ' +
      tabsetHash + ' > .content > .tabset-panes > .content > .tab-pane', this.tabset).forEach(function (it) {
      DEBUG && console.log('tabs-block activateTab for tabset ' + tabsetHash + ' found ' + it.id || it)
      it === tab || it === pane ? it.classList.add('is-active') : it.classList.remove('is-active')
    })
    if (!skipAncestors) {
      const tabInfo = this.hashToTab.get(getTabHash(tab))
      const ancestors = tabInfo && tabInfo.ancestors
      if (ancestors) {
        ancestors.forEach(function (ancestorHash) {
          const ancestorInfo = this.hashToTab.get(ancestorHash)
          if (ancestorInfo) {
            ancestorInfo.activator(undefined, true)
          }
        }, this)
      }
      window.location.fragmentJumper || (window.location.fragmentJumper = { scrollY: window.scrollY })
      DEBUG && console.log('tabs-block tab hash, about to activate fragment jumper ' + getTabHash(tab) +
        ' previous window.location.href: ' + window.location.href +
        ', window.location.fragmentJumper: ', window.location.fragmentJumper)
      const tabHash = getTabHash(tab)
      DEBUG && console.log('tabs-block lastHash: ' + lastHash + ' tabHash: ' + tabHash)
      if (lastHash === tabHash) {
        const scrollTo = window.scrollY
        DEBUG && console.log('tabs-block scrolling to ', scrollTo)
        setTimeout(function () {
          window.scrollTo(0, scrollTo)
        }, 0)
      } else {
        window.location.href = tabHash
      }
      lastHash = tabHash
      DEBUG && setTimeout(function () { console.log('tabs-block scrolled to ', window.scrollY) }, 0)
    }
    // e && e.preventDefault()
  }

  function onHashChange (e) {
    DEBUG && console.log('tabs-block onHashChange')
    DEBUG && e.oldURL && console.log('tabs-block old hash', new URL(e.oldURL).hash)
    DEBUG && console.log('tabs-block new hash', new URL(e.newURL).hash)
    DEBUG && console.log('tabs-block window.location.fragmentJumper', window.location.fragmentJumper)
    // lastHash = new URL(e.newURL).hash
    if (!window.location.fragmentJumper) {
      const hash = new URL(e.newURL).hash
      const tabInfo = this.hashToTab.get(hash)
      if (tabInfo) {
        window.location.fragmentJumper = { target: tabInfo.tab }
        tabInfo.activator()
      }
    }
  }

  function getTabHash (tab) {
    const id = (tab.querySelector('a[id]') || tab).id
    DEBUG && console.log('tabs-block getTabHash', '#' + id)
    return id ? '#' + id : undefined
  }

  function find (selector, from) {
    return Array.prototype.slice.call((from || document).querySelectorAll(selector))
  }

  function getPane (hash, tabset) { //hash is '#' + id
    return tabset.querySelector('.tab-pane' + hash + '_pane')
  }
})()
