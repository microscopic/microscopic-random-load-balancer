'use strict'

const chai = require('chai')
const expect = chai.expect

const RandomLoadBalancer = require('../lib/index')

describe('RandomLoadBalancer', () => {
  describe('balance()', () => {
    it('should throw error if there are no nodes', () => {
      const loadBalancer = new RandomLoadBalancer()

      const nodes = []

      expect(() => loadBalancer.balance(nodes)).to.throw()
    })

    it('should return first node', () => {
      const loadBalancer = new RandomLoadBalancer()

      const nodes = [ { connection: 1 } ]

      for (let i = 0; i < 10; i++) {
        expect(loadBalancer.balance(nodes).connection).to.be.equal(1)
      }
    })

    it('should return random node', () => {
      const loadBalancer = new RandomLoadBalancer()

      const nodes = []

      for (let i = 0; i < 100; i++) {
        nodes.push({ connection: i })
      }

      const results = {}

      for (let i = 0; i < 100; i++) {
        const node = loadBalancer.balance(nodes)

        if (!results[ node.connection ]) {
          results[ node.connection ] = 1
        } else {
          results[ node.connection ]++
        }

        expect(results[ node.connection ]).to.be.below(6)
      }
    })
  })
})
