const products = [
        {
            'id':1,
            'name':'product-1',
            'image' : 'trending-image.jpg',
            'price' : 14.99,
            'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            'reviews' : [
                 {
                    'id':1,
                    'username' : 'Smith',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-1"
                },
                 {
                    'id':2,
                    'username' : 'John',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-2"
                },
                 {
                    'id':3,
                    'username' : 'Jenny',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-3"
                },
                 {
                    'id':4,
                    'username' : 'Micheal',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-4"
                }
              
            ]

        },
        {
            'id':2,
            'name':'product-2',
            'image' : 'trending-image-2.jpg',
            'price' : 9.99,
             'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
             'reviews' : []
        },
        {
            'id':3,
            'name':'product-3',
            'image' : 'trending-image-3.jpg',
            'price' : 11.45,
             'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
             'reviews' : [
                 {
                    'id':1,
                    'username' : 'Harshal',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-11"
                },
                 {
                    'id':2,
                    'username' : 'Lincon',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-22"
                },
                 {
                    'id':3,
                    'username' : 'Richard',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-33"
                },
               
              
            ]
        },
        {
            'id':4,
            'name':'product-4',
            'image' : 'trending-image-4.jpg',
            'price' : 20.22,
             'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
             'reviews' : []
        },
        {
            'id':5,
            'name':'product-5',
            'image' : 'trending-image-2.jpg',
            'price' : 23.33,
             'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
             'reviews' : []
        },
        {
            'id':6,
            'name':'product-6',
            'image' : 'trending-image-4.jpg',
            'price' : 10.05,
             'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
             'reviews' : []
        },
        {
            'id':7,
            'name':'product-7',
            'image' : 'trending-image.jpg',
            'price' : 40.49,
             'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
             'reviews' : []
        },
        {
            'id':8,
            'name':'product-8',
            'image' : 'trending-image-3.jpg',
            'price' :  12.99,
             'description': "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
             'reviews' : [
                 {
                    'id':1,
                    'username' : 'James',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-111"
                },
                 {
                    'id':2,
                    'username' : 'Colt',
                    'avatar' : 'default_user2.png',
                    'review_text' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s-222"
                },
              
              
            ]
        }
        ];