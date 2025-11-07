const buildSubjectsPipeline = ({ query, skip, limit }) => {
  console.log({ query, skip, limit })

  const pipeline = [
    { $match: query },
    { $sort: { name: 1 } },
    { $skip: skip }
  ]

  if (limit) {
    pipeline.push({ $limit: limit })
  }

  pipeline.push(
    {
      $lookup: {
        from: 'offers',
        let: { subjectId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$subject', '$$subjectId'] }
            }
          },
          {
            $group: {
              _id: '$authorRole',
              count: { $sum: 1 }
            }
          }
        ],
        as: 'offerCounts'
      }
    },
    {
      $addFields: {
        totalOffers: {
          student: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $map: {
                      input: {
                        $filter: {
                          input: '$offerCounts',
                          cond: { $eq: ['$$this._id', 'student'] }
                        }
                      },
                      in: '$$this.count'
                    }
                  },
                  0
                ]
              },
              0
            ]
          },
          tutor: {
            $ifNull: [
              {
                $arrayElemAt: [
                  {
                    $map: {
                      input: {
                        $filter: {
                          input: '$offerCounts',
                          cond: { $eq: ['$$this._id', 'tutor'] }
                        }
                      },
                      in: '$$this.count'
                    }
                  },
                  0
                ]
              },
              0
            ]
          }
        }
      }
    },
    {
      $project: {
        name: 1,
        category: 1,
        totalOffers: 1,
        createdAt: 1,
        updatedAt: 1
      }
    }
  )

  return pipeline
}

module.exports = buildSubjectsPipeline
