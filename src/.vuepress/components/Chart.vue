<template>
	<div>
		<iframe :src="src" :style="style"></iframe>
	</div>
</template>


<script>
	export default {
		props: {
			src: String,
			width: [Number, String],
			height: [Number, String]
		},
		computed: {
			style(){
				return {
					'border': 'none',
					'display': 'block',
					'width': this.width || '100%',
					'height': this.height
				}
			}
		}
	}
</script>
