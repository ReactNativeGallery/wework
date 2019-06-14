Router.configure({
  meta: {
    robots: 'index, follow',
    google: 'notranslate',
  },
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  yieldTemplates: {
    header: {
      to: 'header',
    },
    footer: {
      to: 'footer',
    },
  },
  progressSpinner: false,
  progressDelay: 250,
  title: 'We hire React-Native - Job board for React-Native',
})

Router.map(function() {
  this.route('home', {
    path: '/',
    layoutTemplate: 'layoutNoContainer',
    data: function() {
      return {
        jobs: Jobs.find(
          {
            featuredThrough: {
              $exists: false,
            },
            status: 'active',
          },
          {
            sort: {
              createdAt: -1,
            },
            limit: 10,
          },
        ),
        featuredJobs: Jobs.find(
          {
            featuredThrough: {
              $gte: new Date(),
            },
            status: 'active',
          },
          {
            sort: {
              featuredThrough: -1,
            },
          },
        ),
        profiles: Profiles.find(
          {},
          {
            sort: {
              availableForHire: -1,
              randomSorter: 1,
            },
            limit: 8,
          },
        ),
        profile: Profiles.findOne({
          userId: Meteor.userId(),
        }),
      }
    },
    subscriptions: function() {
      return [
        subs.subscribe('homeJobs'),
        subs.subscribe('featuredJobs'),
        Meteor.subscribe('homeDevelopers'),
        subs.subscribe('developerCount'),
        subs.subscribe('jobCount'),
      ]
    },
  })

  this.route('jobs', {
    path: '/jobs',
    title: 'We hire React-Native - All Jobs',
  })

  this.route('myJobs', {
    path: '/myjobs',
    title: 'We hire React-Native - My Jobs',
    data: function() {
      return {
        jobs: Jobs.find(
          {
            userId: Meteor.userId(),
          },
          {
            sort: {
              createdAt: -1,
            },
          },
        ),
      }
    },
    waitOn: function() {
      return subs.subscribe('my_jobs')
    },
  })

  this.route('job', {
    path: '/jobs/:_id/:slug?',
    title: function() {
      if (this.data()) return this.data().title
    },
    meta: function() {
      if (this.data()) {
        var description =
          this.data().title +
          ' - ' +
          this.data().company +
          ' - ' +
          this.data().location
        return {
          description,
          'twitter:title': this.data().title,
          'twitter:description': description,
          'og:description': description,
          'og:title': this.data().title,
          'og:site_name': 'We hire React-Native',
          'og:type': 'article',
          'og:article:author': this.data().company,
        }
      }
    },
    data: function() {
      return Jobs.findOne({
        _id: this.params._id,
      })
    },
    waitOn: function() {
      return subs.subscribe('job', this.params._id)
    },
    onBeforeAction: function() {
      var expectedSlug = this.data().slug()
      if (this.params.slug !== expectedSlug) {
        this.redirect('job', {
          _id: this.params._id,
          slug: expectedSlug,
        })
      } else {
        this.next()
      }
    },
  })

  this.route('jobNew', {
    path: '/job',
    title: 'We hire React-Native - Post a Job',
  })

  this.route('jobEdit', {
    path: '/jobs/:_id/:slug/edit',
    title: 'We hire React-Native - Edit Job Post',
    data: function() {
      return {
        job: Jobs.findOne({
          _id: this.params._id,
        }),
      }
    },
    waitOn: function() {
      return subs.subscribe('job', this.params._id)
    },
  })
})

Router.plugin('ensureSignedIn', {
  only: ['jobEdit', 'jobNew'],
})

Router.onBeforeAction(
  function() {
    this.next()
  },
  {
    only: ['jobEdit', 'jobNew'],
  },
)

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound',
})
