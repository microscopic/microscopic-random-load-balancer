'use strict'

const LoadBalancer = require('microscopic-load-balancer')

class RandomLoadBalancer extends LoadBalancer {
  /**
   * @inheritDoc
   */
  balance (nodes) {
    if (!nodes || !nodes.length) {
      throw new Error()
    }

    if (nodes.length === 1) {
      return nodes[ 0 ]
    }

    return nodes[ Math.floor(Math.random() * nodes.length) ]
  }
}

module.exports = RandomLoadBalancer
